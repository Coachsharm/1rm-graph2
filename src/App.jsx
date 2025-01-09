import React, { useState } from 'react'
    import { Bar } from 'react-chartjs-2'
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js'
    import ChartDataLabels from 'chartjs-plugin-datalabels'

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      ChartDataLabels
    )

    const formulas = {
      Epley: (weight, reps) => weight * (1 + reps / 30),
      Brzycki: (weight, reps) => weight * (36 / (37 - reps)),
      Lombardi: (weight, reps) => weight * Math.pow(reps, 0.1)
    }

    const App = () => {
      const [weight, setWeight] = useState(100)
      const [reps, setReps] = useState(5)
      const [formula, setFormula] = useState('Epley')
      const [darkMode, setDarkMode] = useState(false)

      const calculate1RM = () => formulas[formula](weight, reps)
      const oneRM = calculate1RM()

      const percentages = [90, 80, 70, 60, 50, 40, 30, 20].map(p => ({
        percentage: p,
        weight: (oneRM * p / 100).toFixed(1)
      }))

      const chartData = {
        labels: percentages.map(p => `${p.percentage}%`),
        datasets: [{
          label: 'Weight',
          data: percentages.map(p => p.weight),
          backgroundColor: [
            '#3b82f6', // Light Blue
            '#2563eb', // Medium Blue
            '#1d4ed8', // Darker Blue
            '#1e40af', // Even Darker Blue
            '#1e3a8a', // Dark Blue
            '#1e3a8a', // Dark Blue
            '#1e3a8a', // Dark Blue
            '#1e3a8a'  // Dark Blue
          ]
        }]
      }

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
          datalabels: {
            display: true,
            color: 'white',
            anchor: 'end',
            align: 'top',
            formatter: (value) => `${value} kg`
          }
        }
      }

      return (
        <div className={`${darkMode ? 'dark' : ''} min-h-screen`}>
          <div className="dark:bg-gray-900 dark:text-white min-h-screen p-4">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold">1RM Calculator</h1>
              <p className="text-red-500">by Coach Sharm and Body Thrive</p>
              <p className="text-gray-600 dark:text-gray-400">
                Estimate your max potential effortlessly
              </p>
              <p className="text-yellow-500 mt-4">
                This app helps you estimate your one-rep max (1RM) for exercises like deadlifts. 
                Please input the weight you can lift and the number of reps you completed. 
                Our app will calculate your estimated 1RM weight. 
                Remember to stay safe and lift responsibly!
              </p>
            </header>

            <div className="max-w-2xl mx-auto">
              <section className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={e => setWeight(Number(e.target.value))}
                      className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Reps</label>
                    <input
                      type="number"
                      value={reps}
                      onChange={e => setReps(Number(e.target.value))}
                      min="1"
                      max="20"
                      className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2">Formula</label>
                  <select
                    value={formula}
                    onChange={e => setFormula(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                  >
                    {Object.keys(formulas).map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Your 1RM</h2>
                <div className="text-4xl font-bold mb-4">
                  {oneRM.toFixed(1)} kg
                </div>
                <div className="h-64">
                  <Bar
                    data={chartData}
                    options={chartOptions}
                  />
                </div>
              </section>

              <section className="flex justify-between">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                  onClick={() => {
                    setWeight(100)
                    setReps(5)
                    setFormula('Epley')
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Reset
                </button>
              </section>
            </div>
          </div>
        </div>
      )
    }

    export default App
