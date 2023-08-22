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

  type idexdltProp={
    header:string,
    body:string[]
}

type wagmiRead={
  data?:string[];
  isError?:boolean;
  isLoading?:boolean
}