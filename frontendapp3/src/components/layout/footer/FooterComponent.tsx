const FooterComponent: React.FC = () => {
  return (
      <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
          </div>
      </footer>
  );
};

export default FooterComponent;
