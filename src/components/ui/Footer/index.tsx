export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-gray-300 flex justify-between ">
      <aside>
        <p>
          © {new Date().getFullYear()} TanStock
          <br />
          Built with Next.js & TailwindCSS
        </p>
      </aside>
      <div className="flex w-1/3 justify-between">
        <div>
          <h6 className="footer-title">Fast Links</h6>
          <div className="flex flex-col">
            <a className="link link-hover">About</a>
            <a className="link link-hover">Projects</a>
            <a className="link link-hover">Contact</a>
          </div>
        </div>
        <div>
          <h6 className="footer-title">Contact</h6>
          <div>
            <a className="link link-hover">tan.dev@email.com</a>
            <a className="link link-hover">Send a message</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
