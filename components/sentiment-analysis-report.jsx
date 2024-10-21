"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function SentimentAnalysisReport() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });

  const [sentimentData, setSentimentData] = useState(null);

  // Mock function to fetch sentiment data based on date range
  const fetchSentimentData = (range) => {
    // In a real application, this would be an API call
    console.log("Fetching data for range:", range);
    return {
      totalTweets: 1000,
      positiveTweets: 600,
      negativeTweets: 300,
      neutralTweets: 100,
      overallSentiment: "Positive",
      topTweets: {
        positive: [
          {
            id: 1,
            user: "JohnDoe",
            text: "I absolutely love this new product! It's amazing! #happy",
            likes: 50,
          },
          {
            id: 2,
            user: "JaneSmith",
            text: "The customer service was outstanding. Thank you! #greatexperience",
            likes: 45,
          },
        ],
        negative: [
          {
            id: 3,
            user: "BobJohnson",
            text: "Disappointed with the quality. Expected better. #unhappy",
            likes: 30,
          },
          {
            id: 4,
            user: "AliceWilliams",
            text: "The wait times are too long. Please improve! #frustrated",
            likes: 25,
          },
        ],
        neutral: [
          {
            id: 5,
            user: "SamBrown",
            text: "Just received my order. Let's see how it goes. #neutral",
            likes: 15,
          },
          {
            id: 6,
            user: "EmilyDavis",
            text: "Interesting concept. Need more time to form an opinion. #undecided",
            likes: 10,
          },
        ],
      },
    };
  };

  useEffect(() => {
    setSentimentData(fetchSentimentData(dateRange));
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentimentData(fetchSentimentData(dateRange));
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <Minus className="w-6 h-6 text-gray-500" />;
    }
  };

  if (!sentimentData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap">
            <div>
              <CardTitle className="text-2xl font-bold">
                IKN Sentiment Analysis Report
              </CardTitle>
              <CardDescription>
                Analysis based on {sentimentData.totalTweets} tweets from{" "}
                {dateRange.from} to {dateRange.to}
              </CardDescription>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2 mt-8"
            >
              <div className="flex items-center space-x-2">
                <label htmlFor="from" className="text-sm">
                  From:
                </label>
                <input
                  type="date"
                  id="from"
                  name="from"
                  value={dateRange.from}
                  onChange={handleDateChange}
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="to" className="text-sm">
                  To:
                </label>
                <input
                  type="date"
                  id="to"
                  name="to"
                  value={dateRange.to}
                  onChange={handleDateChange}
                  className="border rounded px-2 py-1"
                />
              </div>
              <Button type="submit" className="ml-2">
                <Calendar className="mr-2 h-4 w-4" />
                Update
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Sentiment
                </CardTitle>
                <BarChart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${getSentimentColor(
                    sentimentData.overallSentiment
                  )}`}
                >
                  {sentimentData.overallSentiment}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Positive Tweets
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sentimentData.positiveTweets}
                </div>
                <Progress
                  value={
                    (sentimentData.positiveTweets / sentimentData.totalTweets) *
                    100
                  }
                  className="mt-2"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Negative Tweets
                </CardTitle>
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sentimentData.negativeTweets}
                </div>
                <Progress
                  value={
                    (sentimentData.negativeTweets / sentimentData.totalTweets) *
                    100
                  }
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="positive" className="mt-6">
            <TabsList>
              <TabsTrigger value="positive">Positive Tweets</TabsTrigger>
              <TabsTrigger value="negative">Negative Tweets</TabsTrigger>
              <TabsTrigger value="neutral">Neutral Tweets</TabsTrigger>
            </TabsList>
            {Object.entries(sentimentData.topTweets).map(
              ([sentiment, tweets]) => (
                <TabsContent key={sentiment} value={sentiment}>
                  <h3 className="text-lg font-semibold mb-2 capitalize">
                    {sentiment} Tweets
                  </h3>
                  <div className="space-y-4">
                    {tweets.map((tweet) => (
                      <Card key={tweet.id}>
                        <CardContent className="flex items-start space-x-4 pt-6">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${tweet.user}`}
                            />
                            <AvatarFallback>
                              {tweet.user.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold">@{tweet.user}</p>
                            <p>{tweet.text}</p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                {getSentimentIcon(sentiment)}
                                <span className="ml-1 capitalize">
                                  {sentiment}
                                </span>
                              </span>
                              <span className="ml-4">{tweet.likes} likes</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
