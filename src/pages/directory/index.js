import React from "react";
import { Router } from "@reach/router";

import Layout from "../../components/Layout";
import Directory from "../../components/Directory";
import ListingPage from "../../templates/listing-page";

export default class LibraryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="bg-white pb-8">
          <section className="max-w-6xl mx-auto px-6">
            <h1 className="lg:text-5xl text-4xl font-straight font-bold text-gray-900">
              Directory
            </h1>
            <Router basepath="/directory">
              {["/", "/browse/*"].map((path, index) => <Directory path={path} key={index}/>)}
              {testListings.map(listing => <ListingPage path={listing.path} key={listing.id} {...listing} />)}
            </Router>
          </section>
        </div>
      </Layout>
    );
  }
}


const testListings = [
  {
    id: 13,
    name: "Mitch's Mobiles",
    path: "/mitchs-mobiles",
    browsePath: "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley",
    type: "SMB",
    industry: "Industry/Field",
    address: "Address",
    phone: "Phone",
    website: "Website",
    shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor massa id neque aliquam. Eget arcu dictum varius duis at.",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis enim lobortis. Amet mauris commodo quis imperdiet massa tincidunt nunc. Vitae purus faucibus ornare suspendisse. Quis imperdiet massa tincidunt nunc. Consectetur adipiscing elit ut aliquam purus. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Tempus quam pellentesque nec nam aliquam sem. Non quam lacus suspendisse faucibus interdum. Eu facilisis sed odio morbi quis commodo odio aenean. Semper risus in hendrerit gravida. Eget mi proin sed libero enim sed faucibus turpis. Tellus integer feugiat scelerisque varius morbi enim nunc. Eleifend mi in nulla posuere sollicitudin. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Pretium quam vulputate dignissim suspendisse in est ante in. Ultrices in iaculis nunc sed augue lacus viverra. Porta lorem mollis aliquam ut porttitor leo a. Suscipit adipiscing bibendum est ultricies integer. Vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. A diam sollicitudin tempor id eu nisl nunc mi. Sit amet commodo nulla facilisi nullam vehicula ipsum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Egestas congue quisque egestas diam. Viverra justo nec ultrices dui sapien eget mi. Duis at tellus at urna condimentum mattis pellentesque id. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Purus gravida quis blandit turpis cursus. Laoreet non curabitur gravida arcu ac tortor dignissim. Viverra maecenas accumsan lacus vel. Non arcu risus quis varius quam quisque id diam vel. Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus. Pharetra vel turpis nunc eget. Est velit egestas dui id ornare. Varius quam quisque id diam vel quam elementum pulvinar etiam. Ante metus dictum at tempor commodo."
  },
  {
      id: 14,
      name: "GradeA Tools",
      path: "/grade-a-tools",
      browsePath: "/browse/los-angeles-metro-area/los-angeles/san-gabriel-valley",
      type: "SMB",
      industry: "Industry/Field",
      address: "Address",
      phone: "Phone",
      website: "Website",
      shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor massa id neque aliquam. Eget arcu dictum varius duis at.",
      longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis enim lobortis. Amet mauris commodo quis imperdiet massa tincidunt nunc. Vitae purus faucibus ornare suspendisse. Quis imperdiet massa tincidunt nunc. Consectetur adipiscing elit ut aliquam purus. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Tempus quam pellentesque nec nam aliquam sem. Non quam lacus suspendisse faucibus interdum. Eu facilisis sed odio morbi quis commodo odio aenean. Semper risus in hendrerit gravida. Eget mi proin sed libero enim sed faucibus turpis. Tellus integer feugiat scelerisque varius morbi enim nunc. Eleifend mi in nulla posuere sollicitudin. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Pretium quam vulputate dignissim suspendisse in est ante in. Ultrices in iaculis nunc sed augue lacus viverra. Porta lorem mollis aliquam ut porttitor leo a. Suscipit adipiscing bibendum est ultricies integer. Vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. A diam sollicitudin tempor id eu nisl nunc mi. Sit amet commodo nulla facilisi nullam vehicula ipsum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Egestas congue quisque egestas diam. Viverra justo nec ultrices dui sapien eget mi. Duis at tellus at urna condimentum mattis pellentesque id. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Purus gravida quis blandit turpis cursus. Laoreet non curabitur gravida arcu ac tortor dignissim. Viverra maecenas accumsan lacus vel. Non arcu risus quis varius quam quisque id diam vel. Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus. Pharetra vel turpis nunc eget. Est velit egestas dui id ornare. Varius quam quisque id diam vel quam elementum pulvinar etiam. Ante metus dictum at tempor commodo."
  }
];