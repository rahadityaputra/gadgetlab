import { MongoClient } from "mongodb";

let device, deviceId, deviceCollection, client;


beforeAll(async ()=> {
     client = new MongoClient("mongodb://localhost:27017");
})

beforeEach(async () => {
    deviceCollection = client.db('gadgetlab_database').collection('devices');

  deviceId = "apple_iphone_13_pro_max-11089";
  device = {
    name: "Apple iPhone 13 Pro Max",
    img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
    quickSpec: [
      {
        name: "Display size",
        value: '6.7"',
      },
    ],
    detailSpec: [
      {
        category: "Network",
        specifications: [
          {
            name: "Technology",
            value: "GSM / CDMA / HSPA / EVDO / LTE / 5G",
          },
        ],
      },
    ],
  };
});

afterAll(async () => {
  await  client.close();
});

test("harusnya bisa ke save di mongodb", async () => {
  const result = await saveDeviceData({
    deviceId: "apple_iphone_13_pro_max-11089",
    deviceData: device,
    isTopDevice: true,
    topRanking: {
      rank: 1,
      category: "by fans",
    },
  });

  expect(result).toBe(true);
});
