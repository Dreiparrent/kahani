import { environment } from 'src/environments/environment';
import { DropdownQuestion, QuestionType } from 'src/app/shared/forms/question-base';
import { Injectable } from '@angular/core';
import { Campaign, CampaignBase, Client, ContentType, IClientDocument, ICampaignDocument, IClientQuestion } from './constatnts';
import { AngularFirestore, DocumentSnapshot, DocumentReference, QuerySnapshot, CollectionReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { TextboxQuestion } from 'src/app/shared/forms/question-base';
import { Subject, BehaviorSubject, Subscription, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    private storgageRef: AngularFireStorageReference;
    private campaignsRef: CollectionReference;
    private clientsRef: CollectionReference;
    public responseRef: CollectionReference;

    private _campaign = new BehaviorSubject<Campaign>(null);
    public get campaign() { return this._campaign.getValue(); }
    public set campaign(campaign) {
        this.storgageRef = this.storage.ref(`campaigns/${campaign.ref.id}`);
        this._campaign.next(campaign);
    }

    private _client = new BehaviorSubject<Client>(null);
    public get client() {
        return this._client.getValue();
    }
    public set client(client) {
        this._client.next(client);
    }
    public user = new BehaviorSubject<firebase.User>(null);
    constructor(private authstore: AngularFireAuth, private cloudstore: AngularFirestore,
        private storage: AngularFireStorage, private router: Router) {
        this.campaignsRef = this.cloudstore.collection('campaigns').ref;
        this.clientsRef = this.cloudstore.collection('clients').ref;
        this.authstore.user.subscribe(user => {
            if (user)
                this.user.next(user);
            else {
                this.user.next(null);
                this.router.navigate(['/']);
            }
        });
    }
    public question: IClientQuestion;
    public userQuestions: any;
    public extraQuestions: any;
    public _response = new BehaviorSubject<DocumentSnapshot<IVideo>>(null);
    get response() {
        return this._response.getValue().data();
    }
    get videos() {
        return this._response.getValue().ref.collection('responses');
    }
    // set videos(videos) {
    //     this.videos = videos;
    // }
    // private get userQuestions() {
    //     const data = {};
    //     this.campaign.userQuestions.forEach(q => {
    //         data[q.label] = q.value;
    //     });
    //     return data;
    // }
    // private get extraQuestions() {
    //     const data = {}
    //     this.campaign.extraQuestions.forEach(q => {
    //         data[q.label] = q.value;
    //     });
    //     return data;
    // }
    private get chosenRef(): DocumentReference {
        return this.question.ref;
    }

    public async getClient(id: string, setClient = true) {
        let client: Client;
        try {
            const snapshot = await this.clientsRef.doc(id).get();
            try {
                if (!snapshot.exists)
                    throw new Error('not a real document');
                client = new Client(snapshot as DocumentSnapshot<IClientDocument>);
            } catch (error) {
                console.warn(error);
                client = null;
            }
        } catch (error) {
            console.warn(error);
            console.error('CANNOT CONNECT TO DATABASE');
            client = null;
        } finally {
            if (client && setClient)
                this.client = client;
            return client;
        }
    }
    public async getVideos(campaign: string, video: string) {
        this.campaign = new Campaign(await this.getUrl('link'));
        const response = await this.campaignsRef.doc(campaign).collection('questions').doc(video).get();
        if (response.exists) {
            this._response.next(response as DocumentSnapshot<IVideo>);
            return true;
        }
        console.log(campaign, video, response);
        return false;
    }
    public async getVideoRef(id: string) {
        const ref = await this.storage.storage.ref(`campaigns/${this.campaign.ref.id}/responses/${id}`).getDownloadURL();
        console.log(`campaigns/${this.campaign.ref.id}/responses/${id}`);
        return ref;
    }
    public async getUrl(link: string) {
        let campaignData: DocumentSnapshot<ICampaignDocument>;
        try {
            const snapshot = await this.campaignsRef.where('link', '==', link).get();
            try {
                if (snapshot.empty)
                    throw new Error('not a real link: ' + link);
                if (!snapshot.docs[0].exists)
                    throw new Error('cannot retrieve campaign');
                campaignData = snapshot.docs[0] as DocumentSnapshot<ICampaignDocument>;
            } catch (error) {
                console.warn(error);
                campaignData = null;
            }
        } catch (error) {
            console.warn(error);
            console.error('CANNOT CONNECT TO DATABASE');
            campaignData = null;
        } finally {
            return campaignData;
        }
    }

    public async isAuth() {
        if (this.user.getValue())
            return true;
        else return false;
    }
    public async getAuth(admin = false) {
        try {
            const persist = await this.authstore.auth.setPersistence(auth.Auth.Persistence.LOCAL);
            const provider = new auth.GoogleAuthProvider();
            const signin = await this.authstore.auth.signInWithPopup(provider);
            const isAdmin = await this.cloudstore.collection('users/users/refs').ref.doc(signin.user.uid).get();
            // TODO: make into firebase function call and remove collection access privelage completely
            if (!isAdmin.exists) {
                this.authstore.auth.signOut();
                throw new Error('Account is not valid');
            } else if (admin)
                return isAdmin.data()['admin'];
            else return true;
        } catch (error) {
            console.error(error);
            console.warn('Unable to sign in');
            return false;
        }
    }

    setter() {
        const testClientCol = this.cloudstore
            .collection('clients')
            .doc('0');
        const testCamp = this.cloudstore
            .collection('campaigns')
            .doc('0');
        testClientCol.set({
            name: 'Test Client',
            contact: {
                email: 'cleint@email.com',
                phone: '1231231234',
                website: 'www.site.com',
                address: ''
            },
            campaigns: [testCamp.ref],
            starred: [
                {
                    type: 0,
                    id: '0'
                }
            ]
        });
        testCamp.set({
            name: 'Project X-ITE',
            link: 'link',
            head: {
                type: ContentType.image,
                content: '/assets/Project-X-ITE.png',
            },
            subhead: {
                type: ContentType.text,
                content:
                    'YOU HAVE GREAT STORIES. AND WE WANT TO HEAR THEM.'
            },
            primary: {
                font: 'Calibri',
                size: 24,
                color: '#673ab7',
                weight: '500'
            },
            accent: {
                font: 'Calibri',
                size: 21,
                color: '#ff4081',
                weight: '400'
            },
            warn: {
                font: 'Calibri',
                size: 24,
                color: '#f44336',
                weight: '400'
            },
            background: {
                type: ContentType.video,
                content: '/assets/GC.mp4',
                poster: '/assets/GC.png',
                color: '#000000bb'
            },
            questions: [
                { text: 'Question 1', length: 60, order: 0 },
                { text: 'Question 2', length: 60, order: 1 },
                { text: 'Question 3', length: 60, order: 2 }
            ],
            userQuestions: [
                {
                    key: 'name',
                    label: 'Name',
                    required: true,
                    order: 1,
                    type: 'text'
                },
                {
                    key: 'email',
                    label: 'email',
                    required: true,
                    order: 2,
                    type: 'email'
                }
            ],
            extraQuestions: [
                {
                    key: 'extra',
                    label: 'extra',
                    order: 3,
                    required: false,
                    type: 'dropdown',
                    options: [
                        {
                            key: 'o1',
                            value: 'o1'
                        },
                        {
                            key: 'o2',
                            value: '02'
                        }
                    ]
                }
            ]
        });
    }

    public async uploadRecord(blob: Blob) { // metadata
        let result = false;
        try {
            const ref = Date.now().toString();
            const qref = this.chosenRef.collection('responses');
            const chosen = qref.id;
            const uploadData: {time: number, userQuestions?: any, extraQuestions?: any} = {time: Date.now()};
            if (this.userQuestions)
                uploadData.userQuestions = this.userQuestions;
            if (this.extraQuestions)
                uploadData.extraQuestions = this.extraQuestions;
            const rref = await qref.add(uploadData);
            const upload = await this.storgageRef.child(chosen + '/' + rref.id).put(blob);
            result = true;
            console.log('uploaded', upload);
        } catch (error) {
            console.error(error);
        } finally {
            return result;
        }
    }
}
interface IVideo {
    question: string;
}