<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $appointmentData;

    /**
     * Create a new message instance.
     *
     * @param array $appointmentData
     * @return void
     */
    public function __construct(array $appointmentData)
    {
        $this->appointmentData = $appointmentData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.appointment')
                    ->subject('New Appointment Submission')
                    ->with('appointmentData', $this->appointmentData);
    }
}
