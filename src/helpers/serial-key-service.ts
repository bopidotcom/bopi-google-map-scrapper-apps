import { existsSync, writeFileSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { IpcMainEvent, net } from 'electron';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
import { SKEY_SECRET_KEY, VALIDATION_URL } from '../../app.config';

export default class SerialKeyService {
    private event: IpcMainEvent;
    private baseDir: string;
    private skPath: string;
    private deviceId: string;
    private skFilename = '.key';
    constructor (baseDir: string, skPath: string, deviceId: string) {
        // this.event = event;
        // console.log(baseDir)
        this.baseDir = baseDir;
        this.skPath = skPath;
        this.deviceId = deviceId;
    }

    async isActivated (fullchecking = false): Promise<boolean> {
        return new Promise((resolve, reject) => {
            (async () => {
                // let isActivated = false;
                const licensePath = this.baseDir + this.skPath + this.skFilename;
                const isFileLicenseExist = await existsSync(licensePath);
                if (!isFileLicenseExist) {
                    this.triggerEvent('registered', false);
                    return resolve(false);
                }
                const fileContent = await readFileSync(licensePath, 'utf8');
                const jsonObject = JSON.parse(this.decrypt(fileContent));
                if (jsonObject.deviceId !== this.deviceId) {
                    this.triggerEvent('registered', false);
                    return resolve(false);
                }
                if (fullchecking) {
                    try {
                        await this.doValidation(jsonObject)
                    } catch (e) {
                        await this.removeSerialKey();
                        this.triggerEvent('registered', false);
                        return resolve(false);
                    }
                }

                // this.triggerEvent('registered', false);
                // return resolve(false);
                this.triggerEvent('registered', true);
                return resolve(true);
            })()
        })
    }

    setEvent (event: IpcMainEvent): void {
        if (!this.event) {
            this.event = event;
        }
    }

    private triggerEvent (eventName: string, value: any): void {
        if (this.event) {
          this.event.sender.send(`serialkey.service.${eventName}`, value);
        }
    }

    // Function to encrypt a string
    private encrypt(text: string): string {
        const iv = randomBytes(16); // Generate a random IV (Initialization Vector)
        const cipher = createCipheriv('aes-256-cbc', Buffer.from(SKEY_SECRET_KEY), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + encrypted;
    }

    // Function to decrypt a string
    private decrypt(encryptedText: string): string {
        const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extract the IV from the encrypted text
        const encryptedTextWithoutIv = encryptedText.slice(32); // Remove the IV from the encrypted text
        const decipher = createDecipheriv('aes-256-cbc', Buffer.from(SKEY_SECRET_KEY), iv);
        let decrypted = decipher.update(encryptedTextWithoutIv, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    async watchSerialKey (): Promise<void> {
        // setTimeout(async  () => {
            await this.isActivated(true)
            // this.triggerEvent('registered', await this.isActivated(true));
            setInterval(async () => {
                await this.isActivated(true)
                // this.triggerEvent('registered', await this.isActivated(true));
            }, 1800000); // 1800000 miliseconds = 30 minutes
        // }, 1800000)
        // console.log('watchSerialKey')
    }

    private saveSerialKey (uniqueKey: string, expiredAt: Date): Promise<string> {
        return new Promise((resolve, reject) => {
            (async () => {
                const jsonObject = {
                    uniqueKey: uniqueKey,
                    deviceId: this.deviceId,
                    expiredAt: expiredAt,
                    timestamp: new Date().toISOString()
                }
                const jsonString = JSON.stringify(jsonObject);
                const encrypted = this.encrypt(jsonString);
                try {
                    await mkdirSync(this.baseDir + this.skPath, { recursive: true });
                    await writeFileSync(this.baseDir + this.skPath + this.skFilename, encrypted);
                    resolve('success')
                } catch (error) {
                    reject(error)
                }
            })()
        })
    }

    private async removeSerialKey (): Promise<void> {
        try {
            const dir = this.baseDir + this.skPath + this.skFilename;
            if (await existsSync(dir)){
                await rmSync(dir, { recursive: true, force: true });
            }
        } catch (error) {
            console.log(error)
        }
    }

    async doValidation (decryptedContent: object): Promise<object> {
        return new Promise((resolve, reject) => {
            (async () => {
                const postData = JSON.stringify(decryptedContent);
                let response;
                try {
                    response = await net.fetch(VALIDATION_URL, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: postData
                    });
                } catch (e) {
                    return resolve({
                        message: `HTTP error! Failed to connect server`
                    });
                }

                // fail
                if (!response.ok) {
                    let errorResponse = null;
                    try {
                        errorResponse = await response.json()
                    } catch (e) {}
                    if (response?.status === 400) {
                        return reject(errorResponse?.message);
                    } else {
                        return resolve({
                            message: `HTTP error! Status: ${response.status}`
                        });
                    }
                }
                // success
                try {
                    const responseJson = await response.json();
                    return resolve(responseJson);
                } catch (e) {
                    reject(e)
                }
            })()
        })
    }
}