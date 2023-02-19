import { useState, ChangeEventHandler } from "react";
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import DropDown from './components/drop_down';
import Tip from './components/tip';
import Loading from './components/loading';
import { openAIVaribleNamingApi, VariableNamingConventions } from "./api";
import { writeText } from './utils';

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [convention, setConvention] = useState<VariableNamingConventions>(VariableNamingConventions.Camelcase);
  const [variableName, setVaribleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyTipVisible, setCopyTipVisible] = useState(false);

  const onChangeNamingConvention = (type: VariableNamingConventions) => {
    setConvention(type);
  }

  const onChangePrompt: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    setPrompt(value);
  }

  const nameButtonClick = async () => {
    if (loading) {
      return;
    }
    setVaribleName("");
    setLoading(true);
    const name = await openAIVaribleNamingApi(prompt, convention);
    setLoading(false);
    setVaribleName(name);
  }

  const copyVarible = () => {
    writeText(variableName).then(() => {
      setCopyTipVisible(true);
      const timer = setTimeout(() => {
        setCopyTipVisible(false);
        clearTimeout(timer);
      }, 2000);
    })
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Tip content="copy to your clipboard" visible={copyTipVisible} />
      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-2 sm:mt-4">
        <h1 className="sm:text-4xl text-4xl max-w-2xl font-bold text-slate-900">
          Name the variables for you
        </h1>
        <div className="max-w-xl w-full mt-4">
          <p className="text-left font-medium">
            Select your variable naming convention.
          </p>
          <div className="block">
            <DropDown onChange={onChangeNamingConvention} />
          </div>
          <p className="text-left font-medium sm:mt-8 mt-4">
            Describe the information of the varible.
          </p>
          <textarea
            value={prompt}
            rows={4}
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 py-2 px-3 outline-none"
            placeholder="e.g. A variable to save the audio link."
            onChange={onChangePrompt}
          ></textarea>

          <button 
            className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full" 
            type="button" 
            onClick={nameButtonClick}
          >
            {loading ? <Loading color="#fff" style="normal"/> : <span>Name it!</span>}
          </button>
        </div>
        {variableName && <div
          className="relative max-w-xl w-full block bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border mt-4"
          onClick={copyVarible}
        >
          <DocumentDuplicateIcon
            className="h-6 w-6 text-gray-400 absolute top-1 right-1"
            aria-hidden="true"
          />
          <code>{variableName}</code>
        </div>}
      </main>

    </div>
  );
}

export default App;
