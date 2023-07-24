export class DecodingTokenModel {
   tokenNumber: string;
   tranId: number;

   constructor(tokenNumber: string, tranId: number) {
      this.tokenNumber = tokenNumber;
      this.tranId = tranId;
   }
}