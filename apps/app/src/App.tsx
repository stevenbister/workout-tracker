import { useState } from 'react';

import { Button } from '@repo/ui/components/button';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </Button>
        </>
    );
}

export default App;
