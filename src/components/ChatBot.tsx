import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm the Recipe Assistant. Tell me what ingredients you have, and I'll suggest some easy recipes for college students.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { products } = useAppContext();

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Process input and generate response
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      const botMessage: Message = {
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const generateResponse = (input: string): string => {
    const ingredients = input
      .toLowerCase()
      .split(/[,\s]+/)
      .filter((word) => word.length > 2);

    // Check if any ingredients match our product list
    const availableProducts = products.filter((product) =>
      ingredients.some(
        (ingredient) =>
          product.name.toLowerCase().includes(ingredient) ||
          product.tags.some((tag) => tag.toLowerCase().includes(ingredient))
      )
    );

    if (ingredients.length === 0) {
      return "I didn't recognize any ingredients. Could you please list some ingredients you have?";
    }

    if (availableProducts.length === 0) {
      // Generic response based on common ingredients
      if (ingredients.includes('egg') || ingredients.includes('eggs')) {
        return "With eggs, you could make a quick scramble! Beat eggs, add a splash of milk if available, and cook on medium heat. Add any vegetables you have for extra nutrients. You can also make a simple fried egg sandwich with bread and any condiments you have.";
      }

      if (ingredients.includes('potato') || ingredients.includes('potatoes')) {
        return "Potatoes are versatile! You can make quick microwave 'baked' potatoes (poke holes, microwave for 5-7 minutes). Top with whatever you have - cheese, beans, or even just salt and pepper. You can also dice them and pan fry for home fries.";
      }

      if (ingredients.includes('beans') || ingredients.includes('bean')) {
        return "Beans make a great protein source! Warm them up and serve over rice or with tortillas. Add any spices you have for flavor. You can also mash them with a fork for a quick bean spread for sandwiches or wraps.";
      }

      return "Based on what you have, I'd suggest looking up simple one-pot meals or sandwiches. You can also try instant ramen with added ingredients to make it more nutritious. What specific ingredients would you like recipe ideas for?";
    }

    // Generate response based on available products
    const productNames = availableProducts.map((p) => p.name.toLowerCase());

    if (productNames.includes('black beans') || productNames.includes('canned black beans')) {
      if (productNames.includes('rice') || ingredients.includes('rice')) {
        return "You can make a simple bean and rice bowl! Heat the beans in a pan, cook rice separately, then combine. Add any spices you have like cumin or chili powder. Top with any vegetables for a complete meal.";
      } else {
        return "With black beans, you can make a quick bean dip by mashing them with a fork and adding any spices you have. Great with chips or as a spread on bread or tortillas.";
      }
    }

    if (productNames.includes('broccoli')) {
      return "Broccoli makes a great stir fry! Cut it into florets and cook in a pan with a little oil until tender. Add soy sauce if you have it, or just salt and pepper. Serve with rice or noodles if available.";
    }

    if (productNames.includes('pasta') || ingredients.includes('pasta')) {
      return "Pasta is quick and easy! Cook according to package directions. If you have canned tomatoes, you can make a simple sauce by simmering them with any herbs you have. Otherwise, a little olive oil, salt, and pepper works great too.";
    }

    if (productNames.includes('milk')) {
      if (productNames.includes('cereal') || ingredients.includes('cereal')) {
        return "The classic: cereal and milk! Quick, easy, and no cooking required.";
      } else {
        return "With milk, you can make simple mug cakes or puddings. For a basic mug cake, mix 4 tbsp flour, 2 tbsp sugar, 2 tbsp cocoa powder, ¼ tsp baking powder, pinch of salt, 5 tbsp milk, 2 tbsp oil in a mug and microwave for 1-1.5 minutes.";
      }
    }

    // Generic response
    return `Based on your ingredients (${availableProducts.map(p => p.name).join(', ')}), you could make a simple meal by combining them. For vegetables, a quick stir fry works well. For canned goods, they can be heated and eaten as a side dish. Would you like more specific recipe ideas for any particular ingredient?`;
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-accent-green text-white shadow-lg hover:bg-accent-green/90 transition-all z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-0 right-0 w-full md:w-96 h-[500px] max-h-[80vh] bg-white rounded-t-lg md:rounded-lg shadow-xl z-50 flex flex-col overflow-hidden transition-all transform ${
          isOpen
            ? 'translate-y-0 md:translate-y-0 md:bottom-6 md:right-6'
            : 'translate-y-full md:translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle size={20} className="mr-2" />
            <h3 className="font-semibold">Recipe Assistant</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-neutral-200 transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-neutral-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.isUser ? 'flex flex-row-reverse' : 'flex'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white shadow rounded-tl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.isUser ? 'text-white/70' : 'text-neutral-400'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t">
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="List ingredients you have..."
              className="flex-1 p-2 border border-neutral-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-r-lg hover:bg-secondary-blue transition-colors flex items-center justify-center"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;