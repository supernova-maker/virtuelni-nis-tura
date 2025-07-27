export default function CallToAction() {
  const handleStartTour = () => {
    // Scroll to hero section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBusiness = () => {
    // TODO: Implement add business functionality
    console.log("Add business requested");
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Započnite svoju virtuelnu turu</h2>
        <p className="text-xl mb-8 text-blue-100">
          Otkrijte skrivene dragulje Niša kroz naše 360° panorame
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleStartTour}
            className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Počni turu sada
          </button>
          <button 
            onClick={handleAddBusiness}
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors"
          >
            Dodaj svoj biznis
          </button>
        </div>
      </div>
    </section>
  );
}
