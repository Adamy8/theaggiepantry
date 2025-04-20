import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

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

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to clean and format the response from Gemini
  const formatRecipeResponse = (response: string) => {
    if (!response) return '';

    // Remove unnecessary characters, markdown, and make the response concise
    let cleanedResponse = response.replace(/\*\*([^\*]+)\*\*/g, '$1')  // Remove bold (**)
                                    .replace(/\*([^\*]+)\*/g, '$1');  // Remove italic (*)
    cleanedResponse = cleanedResponse.split('\n').slice(0, 20).join('\n');  // Limit response to 20 lines

    // Format as concise bullet points
    const sections = cleanedResponse.split('\n').map((line) => {
      if (line.startsWith('1.')) return `- Culinary Uses:`;
      if (line.startsWith('2.')) return `- Nutrition:`;
      if (line.startsWith('3.')) return `- Popular Recipes:`;
      return line;  // Return the line as-is if it doesn't match a section
    });

    return sections.join('\n\n');
  };

  // Function to generate the full prompt for Gemini
  const getRecipe = async (input: string) => {
    const fullPrompt = `
      Provide a concise ingredient guide for "${input}".
      Limit the response to 20 lines or less, including sections for:
      1. Culinary Uses
      2. Nutrition
      3. Popular Recipes
    `;

    // Send request to the backend to get a response from Gemini
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        body: JSON.stringify({ prompt: fullPrompt }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      const formattedRecipe = formatRecipeResponse(data.recipe);

      const botMessage: Message = {
        text: formattedRecipe || "I couldn't find a recipe for that. Can you try again?",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        text: 'Sorry, something went wrong while fetching the recipe.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Call getRecipe function to get a recipe suggestion
    await getRecipe(inputText);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#EC7F47] text-white shadow-lg hover:bg-accent-green/90 transition-all z-50 ${
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
        <div className="bg-[#EC7F47] text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle size={20} className="mr-2" />
            <h3 className="font-semibold text-white">Recipe Assistant</h3>
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
                    ? 'bg-[#EC7F47] text-white rounded-tr-none'
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
              className="flex-1 p-2 border border-[#EC7F47] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#EC7F47]"
            />
            <button
              type="submit"
              className="bg-[#EC7F47] text-white p-2 rounded-r-lg hover:bg-[#EC7F47] transition-colors flex items-center justify-center"
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
