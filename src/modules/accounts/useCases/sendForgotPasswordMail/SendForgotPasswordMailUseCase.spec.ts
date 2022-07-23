import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DayProvider/implementations/DatejsDateProvider';
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppErrors';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail ", ()=>{
    
    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    })

    it("Should be to send forgot password mail to user", async ()=>{
        const sendMail = jest.spyOn(mailProvider, "sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "avzonbop@ospo.pr",
            name: "Blanche Curry",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("avzonbop@ospo.pr");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
          sendForgotPasswordMailUseCase.execute("ka@uj.gr")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    
        usersRepositoryInMemory.create({
          driver_license: "787330",
          email: "abome@regrog.ee",
          name: "Leon Perkins",
          password: "1234",
        });
    
        await sendForgotPasswordMailUseCase.execute("abome@regrog.ee");
    
        expect(generateTokenMail).toBeCalled();
    });
})