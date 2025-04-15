export default {
  logo: <span style={{ fontWeight: 600 }}>Spross</span>,
  project: {
    link: 'https://github.com/wxad/spross',
  },
  docsRepositoryBase: 'https://github.com/wxad/spross/tree/main/website',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Spross',
    };
  },
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://wxad.design/spross" target="_blank">
          Spross
        </a>
        .
      </span>
    ),
  },
  // ... other theme options
};
