const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <ul>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Safety Information</a></li>
              <li><a href="#" className="hover:underline">Cancellation Options</a></li>
              <li><a href="#" className="hover:underline">Our COVID-19 Response</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Community</h4>
            <ul>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Diversity & Belonging</a></li>
              <li><a href="#" className="hover:underline">Invite Friends</a></li>
              <li><a href="#" className="hover:underline">Airbnb Associates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Hosting</h4>
            <ul>
              <li><a href="#" className="hover:underline">Why Host</a></li>
              <li><a href="#" className="hover:underline">Hosting Resources</a></li>
              <li><a href="#" className="hover:underline">Community Forum</a></li>
              <li><a href="#" className="hover:underline">Explore Hosting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">About</h4>
            <ul>
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Founders&apos; Story</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <div className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Airbnb, Inc. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-800">
              <img 
                src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" 
                alt="Facebook"
                className="w-6 h-6" 
              />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800">
              <img 
                src="https://img.icons8.com/ios-filled/50/000000/twitter.png" 
                alt="Twitter"
                className="w-6 h-6" 
              />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800">
              <img 
                src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" 
                alt="Instagram"
                className="w-6 h-6" 
              />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800">
              <img 
                src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" 
                alt="LinkedIn"
                className="w-6 h-6" 
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
