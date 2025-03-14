// global.d.ts
export {};

declare global {
  // Basta types
  type EmitData = Record<string, unknown>;
  type BastaResponse = object;
  interface BastaError extends Error {
    cause?: {
      code: number;
      message: string;
    };
  }

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
