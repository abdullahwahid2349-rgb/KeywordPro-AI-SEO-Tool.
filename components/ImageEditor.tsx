
import React, { useState, useRef } from 'react';
import { Upload, Wand2, Loader2, Download, RefreshCcw, Image as ImageIcon, Sparkles } from 'lucide-react';
import { editImageWithPrompt } from '../services/geminiService';

export const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [mimeType, setMimeType] = useState('image/png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!originalImage || !prompt.trim()) return;
    
    setLoading(true);
    try {
      const result = await editImageWithPrompt(originalImage, mimeType, prompt);
      if (result) {
        setEditedImage(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `banana-edit-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nano Banana Studio</h2>
        <p className="text-gray-500 mb-6">Use AI to transform your images with natural language prompts.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center relative overflow-hidden group">
              {originalImage ? (
                <div className="relative aspect-video flex items-center justify-center">
                  <img src={originalImage} alt="Original" className="max-h-full rounded-lg shadow-md" />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-medium"
                  >
                    <RefreshCcw className="w-5 h-5" /> Change Image
                  </button>
                </div>
              ) : (
                <div className="py-10">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Click to upload or drag an image</p>
                  <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-6 px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Select File
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                What should we change?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Add a vintage 70s film filter', 'Make the sky look like a sunset', 'Remove the person in the background'"
                className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
              <button
                onClick={handleEdit}
                disabled={loading || !originalImage || !prompt.trim()}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Banana is thinking...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Apply AI Edit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Preview */}
          <div className="bg-gray-900 rounded-2xl flex flex-col min-h-[400px]">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <span className="text-gray-400 text-sm font-medium">Result Preview</span>
              {editedImage && (
                <button 
                  onClick={downloadImage}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:20px_20px]">
              {editedImage ? (
                <img src={editedImage} alt="Edited Result" className="max-w-full max-h-[500px] rounded-lg shadow-2xl animate-in fade-in zoom-in duration-500" />
              ) : (
                <div className="text-center">
                  {loading ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-500 font-medium">Generating your masterpiece...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Wand2 className="w-10 h-10 text-gray-700 mx-auto opacity-50" />
                      <p className="text-gray-600">Your edited image will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
