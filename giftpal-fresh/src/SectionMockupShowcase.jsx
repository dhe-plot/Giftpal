import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code, Palette } from 'lucide-react';
import { SectionMockupDemoPage } from './components/ui/section-mockup-demo';

const SectionMockupShowcase = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-700" />
              <h1 className="text-xl font-bold text-white">
                SectionWithMockup Component Showcase
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <Code size={16} />
                TypeScript + Tailwind + Framer Motion
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Component Info */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-3">
                <Palette size={24} className="text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-400 text-sm">
                Fully responsive layout that adapts to all screen sizes with mobile-first approach
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3">
                <Code size={24} className="text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">TypeScript Ready</h3>
              <p className="text-gray-400 text-sm">
                Fully typed component with proper interfaces and type safety
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mx-auto mb-3">
                <ExternalLink size={24} className="text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Smooth Animations</h3>
              <p className="text-gray-400 text-sm">
                Beautiful scroll-triggered animations powered by Framer Motion
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-white text-lg font-semibold mb-4">Component Usage</h2>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-400 mb-2">// Import the component</div>
            <div className="text-blue-400">import</div>
            <span className="text-white"> SectionWithMockup </span>
            <div className="text-blue-400">from</div>
            <span className="text-green-400"> "@/components/ui/section-with-mockup"</span>
            <br /><br />
            <div className="text-gray-400 mb-2">// Use in your component</div>
            <div className="text-purple-400">&lt;SectionWithMockup</div>
            <br />
            <span className="text-blue-400 ml-4">title</span>
            <span className="text-white">=</span>
            <span className="text-green-400">"Your Title"</span>
            <br />
            <span className="text-blue-400 ml-4">description</span>
            <span className="text-white">=</span>
            <span className="text-green-400">"Your description"</span>
            <br />
            <span className="text-blue-400 ml-4">primaryImageSrc</span>
            <span className="text-white">=</span>
            <span className="text-green-400">"image-url"</span>
            <br />
            <span className="text-blue-400 ml-4">secondaryImageSrc</span>
            <span className="text-white">=</span>
            <span className="text-green-400">"background-image-url"</span>
            <br />
            <span className="text-blue-400 ml-4">reverseLayout</span>
            <span className="text-white">=</span>
            <span className="text-orange-400">{'{false}'}</span>
            <br />
            <div className="text-purple-400">/&gt;</div>
          </div>
        </div>
      </div>

      {/* Component Props */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-white text-lg font-semibold mb-4">Component Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 py-2 px-4">Prop</th>
                  <th className="text-left text-gray-300 py-2 px-4">Type</th>
                  <th className="text-left text-gray-300 py-2 px-4">Required</th>
                  <th className="text-left text-gray-300 py-2 px-4">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 px-4 text-blue-400 font-mono">title</td>
                  <td className="py-2 px-4 text-gray-300">string | ReactNode</td>
                  <td className="py-2 px-4 text-green-400">Yes</td>
                  <td className="py-2 px-4 text-gray-400">Main heading text or JSX element</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 px-4 text-blue-400 font-mono">description</td>
                  <td className="py-2 px-4 text-gray-300">string | ReactNode</td>
                  <td className="py-2 px-4 text-green-400">Yes</td>
                  <td className="py-2 px-4 text-gray-400">Description text or JSX element</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 px-4 text-blue-400 font-mono">primaryImageSrc</td>
                  <td className="py-2 px-4 text-gray-300">string</td>
                  <td className="py-2 px-4 text-green-400">Yes</td>
                  <td className="py-2 px-4 text-gray-400">URL for the main foreground image</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 px-4 text-blue-400 font-mono">secondaryImageSrc</td>
                  <td className="py-2 px-4 text-gray-300">string</td>
                  <td className="py-2 px-4 text-green-400">Yes</td>
                  <td className="py-2 px-4 text-gray-400">URL for the background decorative image</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 px-4 text-blue-400 font-mono">reverseLayout</td>
                  <td className="py-2 px-4 text-gray-300">boolean</td>
                  <td className="py-2 px-4 text-orange-400">No</td>
                  <td className="py-2 px-4 text-gray-400">Reverses the layout (text on right, image on left)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Live Demo */}
      <SectionMockupDemoPage />
    </div>
  );
};

export default SectionMockupShowcase;
