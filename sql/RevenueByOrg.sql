ALTER PROC [dbo].[AdminAnalytics_RevenueByOrg_Select]

	AS


	/*
		EXECUTE dbo.AdminAnalytics_RevenueByOrg_Select

	*/



	BEGIN

		DECLARE @CurrentDate DATETIME2(7)= GETUTCDATE()
				,@PrevWeek DATETIME2(7)= DATEADD(week, -1, GETUTCDATE())
				,@PrevMonth DATETIME2(7)= DATEADD(month, -1, GETUTCDATE())
				,@PrevAnnual DATETIME2(7)= DATEADD(year, -1, GETUTCDATE());
        DECLARE @TwoWeekPrior DATETIME2(7)= DATEADD(week, -2, GETUTCDATE())
				,@TwoMonthPrior DATETIME2(7)= DATEADD(month, -2, GETUTCDATE())
				,@TwoYearPrior DATETIME2(7)= DATEADD(year, -2, GETUTCDATE());

		 SELECT org.Id
				,org.Name	
				,SUM(CASE WHEN (o.DateCreated BETWEEN @PrevAnnual AND @CurrentDate)
				THEN TotalAmount ELSE 0 END) AS AnnualRevenue
				,SUM(CASE WHEN (o.DateCreated BETWEEN @PrevMonth AND @CurrentDate)
				THEN TotalAmount ELSE 0 END) AS MonthlyRevenue
				,SUM(CASE WHEN (o.DateCreated BETWEEN @PrevWeek AND @CurrentDate)
				THEN TotalAmount ELSE 0 END) AS WeeklyRevenue
				,COUNT(o.Id) AS totalOrders
				,Invites = 
			(
				SELECT COUNT(oi.OrgId)
				FROM dbo.OrgInvite AS oi
				WHERE oi.OrgId = org.Id
			)
				,InvitesThisMonth = 
			(
				SELECT COUNT(oi.OrgId)
				FROM dbo.OrgInvite AS oi
				WHERE oi.OrgId = org.Id
				AND
				DATEPART(MONTH, oi.CreateDate) = DATEPART(MONTH, @CurrentDate)
				AND
				DATEPART(YEAR, oi.CreateDate) = DATEPART(YEAR, @CurrentDate)
			)
				,InvitesPrevMonth = 
			(
				SELECT COUNT(oi.OrgId)
				FROM dbo.OrgInvite AS oi
				WHERE oi.OrgId = org.Id
				AND
				DATEPART(MONTH, oi.CreateDate) = DATEPART(MONTH, @CurrentDate) - 1
				AND
				DATEPART(YEAR, oi.CreateDate) = DATEPART(YEAR, @CurrentDate)
			)

				FROM dbo.Orders as o
			INNER JOIN dbo.Organizations as org
				ON o.OrganizationId = org.Id
			INNER JOIN dbo.OrderStatus AS os
				ON o.OrderStatusId = os.Id
					WHERE (o.DateCreated BETWEEN @PrevAnnual AND @CurrentDate)	
                 AND TotalAmount IS NOT NULL
                 AND os.Id <> 6
				 GROUP BY org.Id
						 ,org.Name
					ORDER BY org.Id	
			
	END