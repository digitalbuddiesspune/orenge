import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <main className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 px-6 py-16">
        <div className="flex items-center gap-6">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="h-16 w-16 transition hover:drop-shadow-lg" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="h-16 w-16 animate-spin [animation-duration:20s]" alt="React logo" />
          </a>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Vite + React + Tailwind</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Edit <code className="rounded bg-gray-200 px-2 py-1 font-mono text-sm dark:bg-gray-800">src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setCount((value) => value + 1)}
        >
          Count is {count}
        </button>
      </main>
    </div>
  )
}

export default App
