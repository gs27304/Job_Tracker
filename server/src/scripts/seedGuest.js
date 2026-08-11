import mongoose from 'mongoose';
import User from '../models/User.js';
import Job from '../models/Job.js';
import connectDB from '../config/db.js';

export const seedGuestAccount = async () => {
  try {
    const guestEmail = process.env.GUEST_EMAIL || 'interviewer@demo.com';
    const guestPassword = process.env.GUEST_PASSWORD || 'InterviewerDemo2026!';

    let guestUser = await User.findOne({ email: guestEmail });

    if (!guestUser) {
      console.log('[SeedGuest] Creating Interviewer Demo guest user...');
      guestUser = await User.create({
        name: 'Interviewer Demo',
        email: guestEmail,
        password: guestPassword,
        role: 'guest',
      });
      console.log('[SeedGuest] Guest user created successfully.');
    } else {
      if (guestUser.role !== 'guest') {
        guestUser.role = 'guest';
        await guestUser.save();
        console.log('[SeedGuest] Updated existing account role to guest.');
      } else {
        console.log('[SeedGuest] Guest account interviewer@demo.com is ready.');
      }
    }

    const jobCount = await Job.countDocuments({ createdBy: guestUser._id });
    if (jobCount === 0) {
      console.log('[SeedGuest] Seeding initial demo job applications...');
      const sampleJobs = [
        {
          company: 'Google',
          role: 'Senior Frontend Engineer',
          status: 'Interview',
          appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          notes: 'Completed technical screen. System architecture round scheduled for next week.',
          createdBy: guestUser._id,
        },
        {
          company: 'Meta',
          role: 'Full Stack Engineer (React/Node)',
          status: 'Offer',
          appliedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          notes: 'Offer extended! Discussing equity breakdown and starting date flexibility.',
          createdBy: guestUser._id,
        },
        {
          company: 'Amazon',
          role: 'Software Development Engineer II',
          status: 'Applied',
          appliedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          notes: 'Submitted via employee referral. Waiting for initial recruiter outreach.',
          createdBy: guestUser._id,
        },
        {
          company: 'Netflix',
          role: 'UI Platform Engineer',
          status: 'Wishlist',
          appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          notes: 'Role aligned with modern web performance & micro-frontends work.',
          createdBy: guestUser._id,
        },
        {
          company: 'Stripe',
          role: 'Backend Systems Engineer',
          status: 'Rejected',
          appliedDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
          notes: 'Re-apply after 6 months. Focus on distributed lock design.',
          createdBy: guestUser._id,
        },
      ];

      await Job.insertMany(sampleJobs);
      console.log('[SeedGuest] 5 demo job applications seeded successfully.');
    }
  } catch (error) {
    console.error('[SeedGuest Error]:', error.message);
  }
};

// Execute if run directly from CLI
if (process.argv[1] && process.argv[1].includes('seedGuest.js')) {
  connectDB().then(async () => {
    await seedGuestAccount();
    await mongoose.connection.close();
    process.exit(0);
  }).catch((err) => {
    console.error('CLI Seed Error:', err);
    process.exit(1);
  });
}
