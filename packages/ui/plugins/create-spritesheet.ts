import fs from 'fs';
import { optimize } from 'svgo';

export default function createSpritesheet(options: {
    targets: { src: string; dest: string }[];
    hook: string;
}) {
    const {
        targets = [],
        // https://rollupjs.org/guide/en/#build-hooks
        hook = 'buildStart',
    } = options;

    return {
        name: 'createSpritesheet',

        [hook]: () => {
            // create spritesheet template
            const template = `<svg xmlns="http://www.w3.org/2000/svg"><defs>{{defs}}</defs></svg>`;

            targets.forEach((target) => {
                // read directory and filter for SVG files
                const files = fs
                    .readdirSync(target.src)
                    .filter((file) => file.endsWith('.svg'));

                // create defs for each SVG file
                let defs = '';
                files.forEach((file) => {
                    const contents = fs.readFileSync(
                        `${target.src}/${file}`,
                        'utf8'
                    );
                    const id = file.replace('.svg', '').toLowerCase(); // Set the ID as the filename without the extension

                    // Replace any fixed hex codes with the currentColor value
                    // this makes styling easier in the long run
                    // Note: this will ignore named values; e.g. fill="red" or fill="transparent"
                    const transformedContent = contents
                        .replace(
                            /fill="#[0-9a-fA-F]{3,6}"/g,
                            'fill="currentColor"'
                        )
                        .replace(
                            /stroke="#[0-9a-fA-F]{3,6}"/g,
                            'stroke="currentColor"'
                        );

                    const optimizedSvg = optimize(transformedContent, {
                        multipass: true,
                        plugins: [
                            // set of built-in plugins enabled by default: https://github.com/svg/svgo#built-in-plugins
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeUselessStrokeAndFill: false, // we want to keep the stroke and stroke-width attribute
                                        removeViewBox: false, // we want to keep the viewBox attribute
                                        cleanupIds: false, // we want to avoid duplicate IDs so will keep them as is
                                    },
                                },
                            },
                        ],
                    });
                    const optimizedSvgString = optimizedSvg.data;

                    const createSymbol = () => {
                        const svgRegex = /<svg[^>]+>|<\/svg>/g; // match the opening and closing svg tags
                        const open = optimizedSvgString
                            .match(svgRegex)?.[0]
                            .replace(
                                svgRegex,
                                `<symbol id="${id}" viewBox="${
                                    // match the viewbox attribute and it's values
                                    optimizedSvgString.match(
                                        /viewBox="([^"]+)"/
                                    )?.[1]
                                }">`
                            );
                        const close = optimizedSvgString
                            .match(svgRegex)?.[1]!
                            .replace('svg', 'symbol');

                        return (
                            open +
                            optimizedSvgString.replace(svgRegex, '') +
                            close
                        ).trim();
                    };

                    defs += createSymbol();
                });

                // create target directory if it doesn't exist
                if (!fs.existsSync(target.dest)) {
                    fs.mkdirSync(target.dest);
                }

                // write spritesheet to file
                fs.writeFile(
                    `${target.dest}/spritesheet.svg`,
                    template.replace('{{defs}}', defs),
                    (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(
                                `👾 Spritesheet created: ${target.dest}/spritesheet.svg`
                            );
                        }
                    }
                );
            });
        },
    };
}
