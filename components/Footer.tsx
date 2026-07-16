export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-secondary px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold text-gray-900">
          Gadget<span className="text-accent">.</span>
        </p>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Gadget Accessories. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
