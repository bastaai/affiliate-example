// global.d.ts
export {};

declare global {
  // Basta types
  type EmitData = Record<string, unknown>;
  type BastaResponse = object;
  type BastaError = {
    Code: number;
    Message: string;
  };

  // Basta interface
  interface BastaInterface {
    emit: (
      event: string,
      data: EmitData | null
    ) => Promise<BastaResponse | BastaError>;
  }

  // Declare the global `basta` variable
  const basta: BastaInterface;
}
