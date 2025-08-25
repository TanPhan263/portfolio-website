// components
import { Footer, Navbar } from '@/components';

// sections
import CoursesCategories from './courses-categories';
import Events from './events';
import ExploreCourses from './explore-courses';
import Hero from './hero';
import OutImpressiveStats from './out-impressive-stats';
import StudentsFeedback from './students-feedback';
import Testimonial from './testimonial';
import TrustedCompany from './trusted-companies';

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <OutImpressiveStats />
      <CoursesCategories />
      <ExploreCourses />
      <Testimonial />
      <Events />
      <StudentsFeedback />
      <TrustedCompany />
      <Footer />
    </>
  );
}
