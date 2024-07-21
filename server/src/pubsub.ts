import { Response } from "express";

const clients = new Map<string, Response[]>();

export const subscribe = (channel: string, res: Response) => {
  if (!clients.has(channel)) {
    clients.set(channel, []);
  }
  clients.get(channel)?.push(res);
};

export const unsubscribe = (channel: string, res: Response) => {
    if (!clients.has(channel)) {
        return;
    }
    const index = clients.get(channel)?.indexOf(res);
    if (index !== undefined && index !== -1) {
        clients.get(channel)?.splice(index, 1);
    }
};

export const publish = (channel: string, message: any) => {
  console.log(`Publishing to ${channel}`);
  if (!clients.has(channel)) {
    return;
  }
  clients.get(channel)?.forEach((res) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });
};
