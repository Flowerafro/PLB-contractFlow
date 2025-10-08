

export default function Layout(){
    return (
        <>
        <header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>

        <section>
            <h1>Welcome to the Dashboard</h1>
            <p> Her kommer et komponent som vi dynamisk endrer</p>
        </section>

        <footer>
            <p>Footer content goes here</p>
        </footer>
        </>
        
    )
}