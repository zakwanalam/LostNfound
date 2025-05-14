import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Item } from "@/state/item/itemslice";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { log } from "console";

interface EmailRequest {
  to: string,
  itemId: string,
  itemName: string,
  itemImageUrl: string,
  claimerId: string,
  claimerName: string,
  claimerEmail: string,
  phoneNumber: string
}
interface ItemProps {
  items: Item[],
}
function Items({ items }: ItemProps) {
  const user = JSON.parse(localStorage.getItem("userData"))
  const [claimedItems, setClaimedItems] = useState<number[]>([]);
  console.log(items)
  const [disabled, setDisabled] = useState(false)
  const sendEmail = async (item: Item) => {
    console.log("usr", user);

    const emailRequest: EmailRequest = {
      to: item.email,
      itemId: item.itemId.toString(),
      itemName: item.itemName,
      itemImageUrl: item.imagePath,
      claimerId: user.userId,
      claimerName: user.firstName + ' ' + user.lastName,
      claimerEmail: user.email,
      phoneNumber: user.phoneNumber
    };

    console.log("email req", emailRequest);
    setDisabled(true);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 2000)
    );

    try {
      const response = await Promise.race([
        axios.post('http://localhost:5086/api/email/sendemail', emailRequest, {
          withCredentials: true
        }),
        timeout
      ]);

      if (response.status === 200) {
        setClaimedItems([...claimedItems, item.itemId]);
      }
    } catch (error: any) {
      console.error("Failed to send email:", error.message);
    } finally {
      setDisabled(false); // Always re-enable the button
    }
  };


  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((item) => (
          <Card
            key={item?.itemId}
            className="relative h-80 overflow-hidden cursor-pointer transition hover:shadow-lg text-white"
          >
            <img
              src={item?.imagePath}
              alt={item?.imagePath}
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-10" />

            <CardContent className="relative z-20 h-full flex flex-col justify-between p-4">
              <div>
                <p className="font-semibold text-sm">{item?.itemName}</p>
                <p className="text-xs text-gray-300">{item.location}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        item?.profilePictureUrl?.startsWith("https://example.com/profiles/")
                          ? "https://avatars.githubusercontent.com/u/124599?v=4"
                          : item?.profilePictureUrl || "https://avatars.githubusercontent.com/u/124599?v=4"
                      }
                    />
                    <AvatarFallback>
                      {item.firstName}
                      {item.lastName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs text-white">
                    <p className="font-medium leading-none">
                      {item.firstName} {item.lastName}
                    </p>
                    <p className="text-xs text-gray-300">
                      {item.email}
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full mt-4"
                  onClick={(e) => sendEmail(item)}
                  disabled={claimedItems.includes(item.itemId)} // disable if claimed
                  size="sm"
                >
                  Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Items;
