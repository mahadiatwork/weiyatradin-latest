import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"

const teamMembers: TeamMember[] = [
  {
    name: "Li Guoping",
    title: "Chairman",
    email: "1311067735@qq.com",
    phone: "+8615138088555",
    image: "/li-guoping-chairman.png",
    wechatQR: "/li-guoping-wechat-qr.png",
  },
  {
    name: "Md Estihad Faysal",
    title: "Chief Operating Officer",
    email: "aihe1524@gmail.com",
    phone: "+8613124054279",
    image: "/md-estihad-faysal-coo.png",
    wechatQR: "/md-estihad-faysal-wechat-qr.png",
  },
  {
    name: "Md Mahadi Hasan",
    title: "Chief Technology Officer",
    email: "mahadi.hanshan@gmail.com",
    phone: "+8617868798393",
    image: "/md-mahadi-hasan-cto.jpg",
    wechatQR: "/mahadi-wechat-qr.png",
  },
]

export function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated professionals behind WeiyaTrading's success
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.email} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
