import { GlowCard } from "./spotlight-card";
import { Star, Heart, Package, Zap, Gift, Crown } from "lucide-react";

export function Default() {
  return (
    <div className="min-h-screen bg-[#181312] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Enhanced GlowCard Showcase
        </h1>

        {/* Size Variations */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Size Variations</h2>
          <div className="flex flex-wrap items-end justify-center gap-6">
            <GlowCard size="xs" glowColor="blue">
              <div className="text-center">
                <Package size={24} className="mx-auto mb-2 text-blue-400" />
                <h3 className="text-white font-semibold">XS Card</h3>
                <p className="text-gray-400 text-sm">Compact size</p>
              </div>
            </GlowCard>

            <GlowCard size="sm" glowColor="purple">
              <div className="text-center">
                <Gift size={32} className="mx-auto mb-2 text-purple-400" />
                <h3 className="text-white font-semibold">Small Card</h3>
                <p className="text-gray-400 text-sm">Perfect for widgets</p>
              </div>
            </GlowCard>

            <GlowCard size="md" glowColor="green">
              <div className="text-center">
                <Star size={40} className="mx-auto mb-2 text-green-400" />
                <h3 className="text-white font-semibold">Medium Card</h3>
                <p className="text-gray-400 text-sm">Standard size</p>
              </div>
            </GlowCard>

            <GlowCard size="lg" glowColor="orange">
              <div className="text-center">
                <Crown size={48} className="mx-auto mb-2 text-orange-400" />
                <h3 className="text-white font-semibold">Large Card</h3>
                <p className="text-gray-400 text-sm">Feature highlights</p>
              </div>
            </GlowCard>

            <GlowCard size="xl" glowColor="red">
              <div className="text-center">
                <Zap size={56} className="mx-auto mb-2 text-red-400" />
                <h3 className="text-white font-semibold">XL Card</h3>
                <p className="text-gray-400 text-sm">Hero sections</p>
              </div>
            </GlowCard>
          </div>
        </section>

        {/* Color Variations */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Color Variations</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { color: 'blue', name: 'Ocean Blue', icon: '🌊' },
              { color: 'purple', name: 'Royal Purple', icon: '👑' },
              { color: 'green', name: 'Forest Green', icon: '🌲' },
              { color: 'red', name: 'Fire Red', icon: '🔥' },
              { color: 'orange', name: 'Sunset Orange', icon: '🌅' },
              { color: 'pink', name: 'Rose Pink', icon: '🌹' },
              { color: 'cyan', name: 'Electric Cyan', icon: '⚡' },
              { color: 'yellow', name: 'Golden Yellow', icon: '✨' },
              { color: 'teal', name: 'Ocean Teal', icon: '🏝️' }
            ].map((item) => (
              <GlowCard key={item.color} glowColor={item.color as any} size="sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="text-white font-medium text-sm">{item.name}</h4>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* Animation Variations */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Animation Effects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <GlowCard glowColor="blue" animation="none">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="text-white font-medium">Static</h4>
                <p className="text-gray-400 text-xs">No animation</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="purple" animation="pulse">
              <div className="text-center">
                <div className="text-2xl mb-2">💓</div>
                <h4 className="text-white font-medium">Pulse</h4>
                <p className="text-gray-400 text-xs">Rhythmic glow</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="green" animation="breathe">
              <div className="text-center">
                <div className="text-2xl mb-2">🌬️</div>
                <h4 className="text-white font-medium">Breathe</h4>
                <p className="text-gray-400 text-xs">Gentle scaling</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="orange" animation="float">
              <div className="text-center">
                <div className="text-2xl mb-2">🎈</div>
                <h4 className="text-white font-medium">Float</h4>
                <p className="text-gray-400 text-xs">Floating motion</p>
              </div>
            </GlowCard>
          </div>
        </section>

        {/* Intensity Levels */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Intensity Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard glowColor="cyan" intensity="low">
              <div className="text-center">
                <div className="text-3xl mb-2">🌙</div>
                <h4 className="text-white font-medium">Low Intensity</h4>
                <p className="text-gray-400 text-sm">Subtle glow effect</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="cyan" intensity="medium">
              <div className="text-center">
                <div className="text-3xl mb-2">🌟</div>
                <h4 className="text-white font-medium">Medium Intensity</h4>
                <p className="text-gray-400 text-sm">Balanced glow effect</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="cyan" intensity="high">
              <div className="text-center">
                <div className="text-3xl mb-2">☀️</div>
                <h4 className="text-white font-medium">High Intensity</h4>
                <p className="text-gray-400 text-sm">Vibrant glow effect</p>
              </div>
            </GlowCard>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Interactive Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowCard
              glowColor="green"
              onClick={() => alert('Card clicked!')}
              className="cursor-pointer"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">👆</div>
                <h4 className="text-white font-medium">Clickable Card</h4>
                <p className="text-gray-400 text-sm">Click me to see action</p>
              </div>
            </GlowCard>

            <GlowCard
              glowColor="red"
              disabled={true}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🚫</div>
                <h4 className="text-white font-medium">Disabled Card</h4>
                <p className="text-gray-400 text-sm">Non-interactive state</p>
              </div>
            </GlowCard>
          </div>
        </section>
      </div>
    </div>
  );
}
