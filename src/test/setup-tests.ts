import './extend-matchers';

afterEach(() => {
  vi.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();
});
