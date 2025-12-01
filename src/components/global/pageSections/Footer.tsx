

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="w-full bg-[var(--primary-color)] flex items-center justify-center gap-4 py-4">
       <p className=" text-white text-center ">  © {currentYear} PLB-ContractFlow. All Rights Reserved.</p>
      </footer>
    );
  }