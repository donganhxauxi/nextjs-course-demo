import React from "react";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  console.log(props);
  return (
    <MeetupDetail
      img={props.meetupsData?.image}
      desc={props.meetupsData?.description}
      title={props.meetupsData?.title}
      address={props.meetupsData?.address}
    />
  );
};

export const getStaticPaths = async () => {
  const uri =
    "mongodb+srv://anh:123@cluster0.9gsej.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => {
      return {
        params: {
          meetupID: meetup._id.toString(),
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const meetupID = context.params.meetupID;

  const uri =
    "mongodb+srv://anh:123@cluster0.9gsej.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupID),
  });

  client.close();

  return {
    props: {
      meetupsData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
      },
    },
  };
};

export default MeetupDetails;
