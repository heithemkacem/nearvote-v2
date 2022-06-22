

import {  logging, PersistentMap } from 'near-sdk-as'

const PartyVoteArray = new PersistentMap<string,i32[]>("Array To Store Votes")
const VoterParticipation = new PersistentMap<string,string[]>('Voter Participation Record')
const VoterEmailParticipation = new PersistentMap<string,string[]>('Voter Email Participation Record')

// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  


export function didParticipate(prompt:string, user:string):bool{
  if(VoterParticipation.contains(prompt)){
    let getArray=VoterParticipation.getSome(prompt);
    return getArray.includes(user)
  }else{
    logging.log('prompt not found')
    return false
  }
}

export function emailDidParticipate(prompt:string, email:string):bool{
  if(VoterEmailParticipation.contains(prompt)){
    let getArray=VoterEmailParticipation.getSome(prompt);
    return getArray.includes(email)
  }else{
    logging.log('prompt not found')
    return false
  }
}
export function getVotes(prompt:string):i32[]{
  if(PartyVoteArray.contains(prompt)){
    return PartyVoteArray.getSome(prompt)
  }else{
    logging.log('prompt not found for this vote')
    return[0,0]
  }
}

// Change Methods 
// Changes state of Blockchain 
// Costs a transaction fee to do so 
// Adds or modifies information to blockchain


export function addVote(prompt:string,index:i32):void{
  if(PartyVoteArray.contains(prompt)){
    let tempArray=PartyVoteArray.getSome(prompt)
    let tempVal=tempArray[index];
    let newVal=tempVal+1;
    tempArray[index]=newVal;
    PartyVoteArray.set(prompt,tempArray);
  }else{
    let newArray=[0,0];
    newArray[index]=1;
    PartyVoteArray.set(prompt,newArray);
  }
}

export function recordVoterEmail(prompt:string,email:string):void{
  if(VoterEmailParticipation.contains(prompt)){
    let tempArray=VoterEmailParticipation.getSome(prompt);
    tempArray.push(email);
    VoterEmailParticipation.set(prompt,tempArray)
  }else{
    VoterEmailParticipation.set(prompt,[email]);
  }
} 

export function recordVoter(prompt:string,user:string):void{
  if(VoterParticipation.contains(prompt)){
    let tempArray=VoterParticipation.getSome(prompt);
    tempArray.push(user);
    VoterParticipation.set(prompt,tempArray)
  }else{
    VoterParticipation.set(prompt,[user]);
  }
}
