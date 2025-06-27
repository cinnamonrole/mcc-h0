import TeamOverview from "@/components/team-overview"

export default function Home() {
  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">Team Dashboard</h1>
      <TeamOverview />
    </div>
  )
}
