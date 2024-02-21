import axios from "axios";

export class Api {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(baseUrl: string, apiKey: string,) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    public async createBloxbergCertificate(data: CreateBloxbergCertificate) {
        const response = await axios.post(`${this.baseUrl}/createBloxbergCertificate?api_key=${this.apiKey}`, {
            'publicKey': data.bloxbergAddress,
            'crid': data.crid,
            'cridType': 'sha2-256',
            'enableIPFS': false,
            'metadataJson': JSON.stringify(data.meta)
        }, {
            headers: {
                'api_key': this.apiKey
            }
        });
        return response.data;
    }

    public async downloadCertificate(data: any){
        const response = await axios.post(`${this.baseUrl}/generatePDF_Test?api_key=${this.apiKey}`, data, {responseType: 'arraybuffer', headers: {
                'api_key': this.apiKey
            }})
        return response.data;
    }
}

interface CreateBloxbergCertificate {
    bloxbergAddress: string,
    crid: string[],
    meta: CreateBloxbergCertificateMeta
}
 interface CreateBloxbergCertificateMeta{
     authorName: string,
     researchTitle: string,
     email: string
 }
