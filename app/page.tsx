import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import FlyToCart from "@/components/FlyToCart";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
      <CartDrawer />
      <FlyToCart />
    </>
  );
}
