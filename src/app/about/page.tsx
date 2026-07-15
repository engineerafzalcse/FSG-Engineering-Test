import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About WorkTrack'
};

export default function AboutPage() {
  return (
    <div className='min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl'>
            About WorkTrack
          </h1>
          <p className='text-muted-foreground mt-4 text-lg'>A focused operations dashboard</p>
        </div>

        {/* Content Sections */}
        <div className='space-y-8'>
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Assessment Project</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              WorkTrack is a frontend engineering assessment project built with modern web
              technologies. It demonstrates a focused, production-minded approach to dashboard
              architecture, data workflows, and interface design.
            </p>
          </section>

          {/* Demo Purpose Section */}
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Demo Purpose</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              This application showcases WorkTrack&apos;s operational workflows and technical
              implementation. Explore the interface, inspect the dashboard, and test its core
              functionality.
            </p>
          </section>

          {/* Auth Section */}
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Authentication by Clerk</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              Authentication for this application is securely handled by{' '}
              <a
                href='https://clerk.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary font-medium hover:underline'
              >
                Clerk
              </a>
              , a modern authentication and user management platform. Clerk provides secure sign-in,
              session management, and user data protection out of the box.
            </p>
          </section>

          {/* Data Privacy Section */}
          <section className='bg-card rounded-2xl border p-8 shadow-sm'>
            <h2 className='text-foreground mb-4 text-xl font-semibold'>Data Privacy</h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              We take your privacy seriously. No personal data is misused, shared, or sold to third
              parties. Any information collected during your use of this demo application is used
              solely for the purpose of providing the demonstration experience and is handled in
              accordance with best practices for data protection.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className='mt-12 text-center'>
          <p className='text-muted-foreground text-sm'>
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
