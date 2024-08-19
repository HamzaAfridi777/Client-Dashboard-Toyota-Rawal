<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminAppointmentNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $messageContent;

    /**
     * Create a new message instance.
     *
     * @param string $subject
     * @param string $messageContent
     * @return void
     */
    public function __construct(string $subject, string $messageContent)
    {
        $this->subject = $subject;
        $this->messageContent = $messageContent;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.admin_appointment_notification')
                    ->subject($this->subject)
                    ->with([
                        'subject' => $this->subject,
                        'messageContent' => $this->messageContent,
                    ]);
    }
}
