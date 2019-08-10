Attribute VB_Name = "Module1"
Sub VBAHW()
Dim ws As Worksheet
   For Each ws In Worksheets
   ws.Activate
   Cells(1, 9).Value = "Ticker"
   Cells(1, 10).Value = "Total Stock Volume"
   Dim Column As Integer
   Column = 1
   Dim Summary_Table_Row As Integer
   Summary_Table_Row = 2
   Dim TickerSymbol As String
   Dim TotalVol As Double
   TotalVol = 0
   LastRow = ws.Cells(Rows.Count, 1).End(xlUp).Row
   For I = 2 To LastRow
       If Cells(I + 1, Column).Value <> Cells(I, Column).Value Then
           TickerSymbol = Cells(I, Column).Value
           Range("I" & Summary_Table_Row).Value = TickerSymbol
           TotalVol = TotalVol + Cells(I, 7).Value
           Range("J" & Summary_Table_Row).Value = TotalVol
           Summary_Table_Row = Summary_Table_Row + 1
           TotalVol = 0
       Else:
           TotalVol = TotalVol + Cells(I, 7).Value
       End If
       Next I
    Next ws
End Sub

