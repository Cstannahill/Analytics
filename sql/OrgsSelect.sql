ALTER PROC [dbo].[AdminAnalytics_Orgs_Select]

	AS

/*


		Execute dbo.AdminAnalytics_Orgs_Select	



*/

    BEGIN
		
		DECLARE @CurrentDate DATETIME2(7)= GETUTCDATE()
				
			

		SELECT COUNT(o.Id) AS TotalOrgs, 
               ActiveOrgs =
        (
            SELECT COUNT(o.Id)
            FROM dbo.Organizations AS o
                 INNER JOIN dbo.Users AS u
				 ON o.CreatedBy = u.Id
                 INNER JOIN dbo.UserStatus AS us
				 ON us.Id = UserStatusId
            WHERE UserStatusId = 1
        ) 
               ,PendingOrgs =
        (
            SELECT COUNT(o.Id)
            FROM dbo.Organizations AS o
                 INNER JOIN dbo.Users AS u
				 ON o.CreatedBy = u.Id
                 INNER JOIN dbo.UserStatus AS us
				 ON us.Id = UserStatusId
            WHERE UserStatusId = 3
        )
			
		 
               ,PrevActiveOrgs =
        (
            SELECT COUNT(o.Id)
            FROM dbo.Organizations AS o
                 INNER JOIN dbo.Users AS u
				 ON o.CreatedBy = u.Id
                 INNER JOIN dbo.UserStatus AS us
				 ON us.Id = UserStatusId
            WHERE  DATEPART(month, o.DateCreated) < DATEPART(month, @CurrentDate)
			AND
			DATEPART(YEAR, o.DateCreated) = DATEPART(YEAR, @CurrentDate)
			AND u.UserStatusId = 1
        ) 
			,OrgsAddedPrevMonth = 
		(
			SELECT COUNT(o.Id)
            FROM dbo.Organizations AS o
                 INNER JOIN dbo.Users AS u
				 ON o.CreatedBy = u.Id
                 INNER JOIN dbo.UserStatus AS us
				 ON us.Id = UserStatusId
            WHERE  DATEPART(month, o.DateCreated) = DATEPART(month, @CurrentDate) - 1
			AND
			DATEPART(YEAR, o.DateCreated) = DATEPART(YEAR, @CurrentDate)
			AND u.UserStatusId = 1
		)
			,TotalInvites =
		(
			SELECT COUNT(oi.Id) AS CountOfInvites
			FROM dbo.OrgInvite AS oi
			
			
		)
			,PrevMonthInvites =
		(
			SELECT COUNT(oi.Id) AS CountOfInvites
			FROM dbo.OrgInvite AS oi
			WHERE
			DATEPART(MONTH, oi.CreateDate) = DATEPART(MONTH, @CurrentDate) - 1 
			AND
			DATEPART(YEAR, oi.CreateDate) = DATEPART(YEAR, @CurrentDate)
		)
			,InvitesThisMonth =
		(
			SELECT COUNT(oi.Id) AS CountOfInvites
			FROM dbo.OrgInvite AS oi
			WHERE
			DATEPART(MONTH, oi.CreateDate) = DATEPART(MONTH, @CurrentDate)
			AND
			DATEPART(YEAR, oi.CreateDate) = DATEPART(YEAR, @CurrentDate)
		)


			FROM dbo.Organizations AS o INNER JOIN dbo.Users AS u
				 ON o.CreatedBy = u.Id
                 INNER JOIN dbo.UserStatus AS us
				 ON us.Id = UserStatusId
            WHERE UserStatusId <> 5




	END