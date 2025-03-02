import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="container-fluid" style={{ height: "80vh" }}>
                <div className='d-flex m-3 justify-content-end' style={{gap: "1rem"}}>
                    <Link href={route('login')}>Login</Link>
                    <Link href={route('register')}>Register</Link>
                </div>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <h1>Welcome page</h1>
                </div>

            </div>
        </>
    );
}
