

class PaystackError(Exception):
    """
    Python Paystack Error
    """
    pass

class MissingAuthKeyError(PaystackError):
    """
    We can't find the authentication key
    """
    pass


class InvalidMethodError(PaystackError):
    """
    Invalid or unrecoginised/unimplemented HTTP request method
    """
    pass


class InvalidDataError(PaystackError):
    """
    Invalid input recognised. Saves unecessary trip to server
    """
    pass
