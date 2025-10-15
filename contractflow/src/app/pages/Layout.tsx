
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Layout(){
    return (
        <>
        {/* Header vises øverst på siden */}
        <Header />

        <section>
            <h1>Welcome to the Dashboard</h1>
            <p> Her kommer et komponent som vi dynamisk endrer</p>
        </section>

        <Footer />
        </>
        
        
    )
}