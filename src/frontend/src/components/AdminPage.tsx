import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, ShieldCheck, Users } from "lucide-react";
import { useGetCustomerMessages, useGetUserCount } from "../hooks/useQueries";

export function AdminPage() {
  const { data: userCount, isLoading: loadingCount } = useGetUserCount();
  const { data: messages, isLoading: loadingMessages } =
    useGetCustomerMessages();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8" data-ocid="admin.page">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center shadow-md">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-navy">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            অ্যাডমিন ড্যাশবোর্ড — Bikram Mandal
          </p>
        </div>
        <Badge className="ml-auto bg-gold/20 text-gold border-gold/30 font-semibold">
          Admin
        </Badge>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card className="border-navy/20 shadow-sm" data-ocid="admin.card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              মোট ব্যবহারকারী / Total Users
            </CardTitle>
            <Users className="w-4 h-4 text-navy" />
          </CardHeader>
          <CardContent>
            {loadingCount ? (
              <Skeleton className="h-9 w-20" data-ocid="admin.loading_state" />
            ) : (
              <p className="text-4xl font-display font-bold text-navy">
                {userCount !== undefined ? String(userCount) : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Registered Internet Identity users
            </p>
          </CardContent>
        </Card>

        <Card className="border-navy/20 shadow-sm" data-ocid="admin.card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              মোট বার্তা / Total Messages
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-navy" />
          </CardHeader>
          <CardContent>
            {loadingMessages ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <p className="text-4xl font-display font-bold text-navy">
                {messages ? messages.length : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Customer support messages received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Messages Table */}
      <Card className="border-navy/20 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Customer Support Messages / গ্রাহক সেবার বার্তা
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingMessages ? (
            <div className="space-y-3" data-ocid="admin.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !messages || messages.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">কোনো বার্তা নেই</p>
              <p className="text-sm mt-1">No customer messages yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">প্রেরক / Name</TableHead>
                    <TableHead>বার্তা / Message</TableHead>
                    <TableHead className="w-[180px] text-right">
                      সময় / Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg, idx) => (
                    <TableRow
                      key={String(msg.id)}
                      data-ocid={`admin.row.${idx + 1}`}
                    >
                      <TableCell className="font-medium text-navy">
                        {msg.senderName || "Anonymous"}
                      </TableCell>
                      <TableCell className="text-sm text-foreground max-w-sm">
                        <p className="line-clamp-3 whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {new Date(
                          Number(msg.timestamp / 1_000_000n),
                        ).toLocaleString("bn-IN")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
