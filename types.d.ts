type SessionProps={
    children: React.ReactNode;
  };

  type WagmiProviderType = {
    children: React.ReactNode;
  };
  type ProviderType = {
    children: React.ReactNode;
  };

  type signInProps={
    hasSigned:boolean,
    setHasSigned:(name: boolean) => void;
  }