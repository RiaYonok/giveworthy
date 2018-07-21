import { Map,List,fromJS } from 'immutable';
import User from '@models/User';
import Cause from '@models/Cause';
import DonationProfile from '@models/DonationProfile';

export const localState = ()=>{
    try{
        const persistedState = localStorage.getItem('state');
        if (persistedState===null){
            return undefined;
        }else{
            var payload  = JSON.parse(persistedState);
            const donations = payload.users.current.donationProfile.donations;
            payload.users.current.donationProfile.donations = donations?fromJS(donations):List();
            payload.users.current.donationProfile = new DonationProfile(payload.users.current.donationProfile);


            payload = {
                users:Map({
                    users: Map(payload.users.users),
                    isLoading: payload.users.isLoading,
                    current: new User(payload.users.current)
                }),
                errors:Map(payload.errors),
                questionnaires:Map(payload.questionnaires),
                status:Map(payload.status),
                cause:Map({
                    cause:new Cause(payload.cause.cause)})
            }
            return payload;
        }

    }catch(err){
        console.log(err);
        return undefined;
    }
}

export const saveState = (state)=>{
    try{
        const persistedState = JSON.stringify(state);
        localStorage.setItem("state", persistedState);
    }catch(err){
        console.log(err);
    }
}