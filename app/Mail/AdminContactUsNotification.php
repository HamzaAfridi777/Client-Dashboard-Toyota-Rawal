<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminContactUsNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $messageContent;

    public function __construct(string $subject, string $messageContent)
    {
        $this->subject = $subject;
        $this->messageContent = $messageContent;
    }

    public function build()
    {
        return $this->view('emails.admin_contact_us_notification')
                    ->subject($this->subject)
                    ->with([
                        'subject' => $this->subject,
                        'messageContent' => $this->messageContent,
                    ]);
    }
}
