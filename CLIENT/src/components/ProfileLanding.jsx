// src/components/ProfileLanding.jsx
import image from '../assets/right-landing.jpg'
export default function ProfileLanding({ onAdd }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8">
      {/* Left text */}
      <div className="max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Welcome to ProFlow</h1>
        <p className="text-gray-600 mb-6">
            Welcome to ProFlow—your centralized hub for smarter project and performance management. From here, you can instantly spin up a new workspace to organize your team’s workflows, customize project templates, and bring everyone together under one dashboard. Each workspace you add lets you tailor collaboration with integrated tools, real‑time reporting, and custom branding so you can hit the ground running. Ready to streamline your next initiative? Click “Add Workspace” to get started.
        </p>
        <button
          onClick={onAdd}
          className="bg-[#0D0659] text-white px-6 py-3 rounded-lg"
        >
          Add Workspace
        </button>
      </div>

      {/* Right image */}
      <img
        src={image}
        alt="Workspace Illustration"
        className="mt-8 lg:mt-0 w-full max-w-md"
      />
    </div>
  )
}
