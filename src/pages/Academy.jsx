import PageHeader from "../components/PageHeader";
import WeekTabs from "../components/WeekTabs";
import CTA from "../components/CTA";

export default function Academy() {
  return (
    <>
      <PageHeader
        title="The 30-day academy"
        lede="A structured program that takes your team from first login to a working prototype and a clear certification plan."
      />
      <section className="section section--top">
        <div className="container">
          <WeekTabs />
        </div>
      </section>
      <CTA title="Ready to run week one?" text="Share your team size and roles and we will help you set up the kickoff." />
    </>
  );
}